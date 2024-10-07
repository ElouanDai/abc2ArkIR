// 每个lexblock可能对lex env有push或者pop动作，导致lex index变化，需要遍历cfg静态求解lex index
// 最终的求解的结果是每个基本块的输出lex index (index+update)应该是相同的，但是exit不需要，它直接退出了
// 同时，有可能会有try catch 导致 lex不平衡情况，目前可以不管，可以为此设计一下，方便后期扩展
function update(cfg: CFG<LexBlock>): CFG<LexBlock> {
    const stackIndex = new Map<LexBlock, number>();
    const visiting = new Set<LexBlock>();
    const completed = new Set<LexBlock>();

    stackIndex.set(cfg.entry, cfg.entry.index);

    const validateBalance = (start: LexBlock, index: number): boolean => {
        const toVisit = [start];
        const path = new Map<LexBlock, number>();

        while (toVisit.length > 0) {
            const current = toVisit.pop()!;
            visiting.delete(current);
            completed.add(current);

            const currentIndex = path.get(current)! + current.update;

            for (const next of current.nexts) {
                if (completed.has(next)) continue;

                const nextIndex = path.get(next) ?? index;
                if (visiting.has(next)) {
                    // Detect a cycle: ensure balance within the loop
                    if (nextIndex !== currentIndex) return false;
                } else {
                    visiting.add(next);
                    path.set(next, nextIndex);
                    toVisit.push(next);
                }
            }

            // Handle try-catch blocks as needed
            for (const trap of cfg.traps) {
                if (trap.tries.includes(current)) {
                    for (const catchBlock of trap.catches) {
                        if (!completed.has(catchBlock) && !visiting.has(catchBlock)) {
                            const catchIndex = path.get(catchBlock) ?? index;
                            visiting.add(catchBlock);
                            path.set(catchBlock, catchIndex);
                            toVisit.push(catchBlock);
                        }
                    }
                }
            }
        }

        return true;
    };

    const initialIndex = stackIndex.get(cfg.entry)!;
    if (!validateBalance(cfg.entry, initialIndex)) {
        throw new Error("Lexical environment is not balanced within loops.");
    }

    // Assign updated index to each block
    cfg.blocks.forEach(block => {
        block.index = stackIndex.get(block)!;
    });

    return cfg;
}
