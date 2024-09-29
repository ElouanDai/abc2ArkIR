// 每个lexblock可能对lex env有push或者pop动作，导致lex index变化，需要遍历cfg静态求解lex index
// 最终的求解的结果是每个基本块的输出lex index (index+update)应该是相同的，但是exit不需要，它直接退出了
// 同时，有可能会有try catch 导致 lex不平衡情况，目前可以不管，可以为此设计一下，方便后期扩展
function update(cfg: CFG<LexBlock>): CFG<LexBlock> {
    throw new Error("Method not implemented.");
}