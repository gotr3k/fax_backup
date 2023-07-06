// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class SingleConstDecl extends ConstDeclInnerList {

    private ConstIdentValue ConstIdentValue;

    public SingleConstDecl (ConstIdentValue ConstIdentValue) {
        this.ConstIdentValue=ConstIdentValue;
        if(ConstIdentValue!=null) ConstIdentValue.setParent(this);
    }

    public ConstIdentValue getConstIdentValue() {
        return ConstIdentValue;
    }

    public void setConstIdentValue(ConstIdentValue ConstIdentValue) {
        this.ConstIdentValue=ConstIdentValue;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(ConstIdentValue!=null) ConstIdentValue.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(ConstIdentValue!=null) ConstIdentValue.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(ConstIdentValue!=null) ConstIdentValue.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("SingleConstDecl(\n");

        if(ConstIdentValue!=null)
            buffer.append(ConstIdentValue.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [SingleConstDecl]");
        return buffer.toString();
    }
}
