
// 删除不可达block，除了entry外，没有输入的block一般为dead,但是try-catch有例外，如果try是alive,那么catch也是alive
function detect(cfg: CFG<Block>): CFG<Block> {
    const visited = new Set<Block>();
    const toVisit = [cfg.entry];

    // Traverse CFG from entry block
    while (toVisit.length > 0) {
        const current = toVisit.pop()!;
        if (!visited.has(current)) {
            visited.add(current);
            for (const next of current.nexts) {
                if (!visited.has(next)) {
                    toVisit.push(next);
                }
            }

            // Consider try-catch blocks
            for (const trap of cfg.traps) {
                if (trap.tries.includes(current)) {
                    for (const catchBlock of trap.catches) {
                        if (!visited.has(catchBlock)) {
                            toVisit.push(catchBlock);
                        }
                    }
                }
            }
        }
    }

    // Filter out dead blocks
    const liveBlocks = cfg.blocks.filter(block => visited.has(block));

    // Return a new CFG with only live blocks
    return {
        ...cfg,
        blocks: liveBlocks
    };
}
