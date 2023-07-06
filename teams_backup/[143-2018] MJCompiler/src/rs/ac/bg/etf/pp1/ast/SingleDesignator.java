// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class SingleDesignator extends DesignatorList {

    private DesignatorWithEmpty DesignatorWithEmpty;

    public SingleDesignator (DesignatorWithEmpty DesignatorWithEmpty) {
        this.DesignatorWithEmpty=DesignatorWithEmpty;
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.setParent(this);
    }

    public DesignatorWithEmpty getDesignatorWithEmpty() {
        return DesignatorWithEmpty;
    }

    public void setDesignatorWithEmpty(DesignatorWithEmpty DesignatorWithEmpty) {
        this.DesignatorWithEmpty=DesignatorWithEmpty;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("SingleDesignator(\n");

        if(DesignatorWithEmpty!=null)
            buffer.append(DesignatorWithEmpty.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [SingleDesignator]");
        return buffer.toString();
    }
}
