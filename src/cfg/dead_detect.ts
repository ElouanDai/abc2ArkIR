
// 删除不可达block，除了entry外，没有输入的block一般为dead,但是try-catch有例外，如果try是alive,那么catch也是alive
function detect(cfg: CFG<Block>): CFG<Block> {
    throw new Error("Method not implemented.");
}