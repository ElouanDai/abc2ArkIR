class MirBlock implements LexBlock{
    get update(): number {
        throw new Error("Method not implemented.");
    }
    get index(): number {
        throw new Error("Method not implemented.");
    }
    set index(index: number) {
        throw new Error("Method not implemented.");
    }
    get prevs(): Block[] {
        throw new Error("Method not implemented.");
    }
    set prevs(prevs: Block[]) {
        throw new Error("Method not implemented.");
    }
    get nexts(): Block[] {
        throw new Error("Method not implemented.");
    }
    set nexts(nexts: Block[]) {
        throw new Error("Method not implemented.");
    }
}

class MirCFG implements CFG<MirBlock>{
    get entry(): MirBlock {
        throw new Error("Method not implemented.");
    }
    get exit(): MirBlock {
        throw new Error("Method not implemented.");
    }
    get traps(): Trap<MirBlock>[] {
        throw new Error("Method not implemented.");
    }
}


class MirTrap implements Trap<MirBlock>{
    get tries(): MirBlock[] {
        throw new Error("Method not implemented.");
    }
    get catches(): MirBlock[] {
        throw new Error("Method not implemented.");
    }
}