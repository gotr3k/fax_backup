// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class VarSingle extends VarIdent {

    private String vName;

    public VarSingle (String vName) {
        this.vName=vName;
    }

    public String getVName() {
        return vName;
    }

    public void setVName(String vName) {
        this.vName=vName;
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
        buffer.append("VarSingle(\n");

        buffer.append(" "+tab+vName);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarSingle]");
        return buffer.toString();
    }
}
