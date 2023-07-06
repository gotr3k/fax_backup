// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class SpecNumConst extends NumConst {

    private Integer repeatVal;

    public SpecNumConst (Integer repeatVal) {
        this.repeatVal=repeatVal;
    }

    public Integer getRepeatVal() {
        return repeatVal;
    }

    public void setRepeatVal(Integer repeatVal) {
        this.repeatVal=repeatVal;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("SpecNumConst(\n");

        buffer.append(" "+tab+repeatVal);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [SpecNumConst]");
        return buffer.toString();
    }
}
