interface Block {
    get prevs(): Array<Block>,
    set prevs(prevs: Array<Block>),
    get nexts(): Array<Block>,
    set nexts(nexts: Array<Block>),
}

interface LexBlock extends Block {
    // return lex env update of this block
    get update(): number,
    // return lex stack index of this block
    get index(): number,
    set index(index: number),
}

interface CFG<T extends Block> {
    get entry(): T,
    get exit(): T,
    get blocks(): Array<T>,
    get traps(): Array<Trap<T>>,
}

interface Trap<T extends Block> {
    get tries(): Array<T>,
    get catches(): Array<T>,
}