// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class MultiDesignator extends DesignatorList {

    private DesignatorList DesignatorList;
    private DesignatorWithEmpty DesignatorWithEmpty;

    public MultiDesignator (DesignatorList DesignatorList, DesignatorWithEmpty DesignatorWithEmpty) {
        this.DesignatorList=DesignatorList;
        if(DesignatorList!=null) DesignatorList.setParent(this);
        this.DesignatorWithEmpty=DesignatorWithEmpty;
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.setParent(this);
    }

    public DesignatorList getDesignatorList() {
        return DesignatorList;
    }

    public void setDesignatorList(DesignatorList DesignatorList) {
        this.DesignatorList=DesignatorList;
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
        if(DesignatorList!=null) DesignatorList.accept(visitor);
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorList!=null) DesignatorList.traverseTopDown(visitor);
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorList!=null) DesignatorList.traverseBottomUp(visitor);
        if(DesignatorWithEmpty!=null) DesignatorWithEmpty.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("MultiDesignator(\n");

        if(DesignatorList!=null)
            buffer.append(DesignatorList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(DesignatorWithEmpty!=null)
            buffer.append(DesignatorWithEmpty.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [MultiDesignator]");
        return buffer.toString();
    }
}
