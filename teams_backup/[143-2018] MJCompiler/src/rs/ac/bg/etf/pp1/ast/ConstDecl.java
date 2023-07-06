// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class ConstDecl implements SyntaxNode {

    private SyntaxNode parent;
    private int line;
    private ConstType ConstType;
    private ConstDeclInnerList ConstDeclInnerList;

    public ConstDecl (ConstType ConstType, ConstDeclInnerList ConstDeclInnerList) {
        this.ConstType=ConstType;
        if(ConstType!=null) ConstType.setParent(this);
        this.ConstDeclInnerList=ConstDeclInnerList;
        if(ConstDeclInnerList!=null) ConstDeclInnerList.setParent(this);
    }

    public ConstType getConstType() {
        return ConstType;
    }

    public void setConstType(ConstType ConstType) {
        this.ConstType=ConstType;
    }

    public ConstDeclInnerList getConstDeclInnerList() {
        return ConstDeclInnerList;
    }

    public void setConstDeclInnerList(ConstDeclInnerList ConstDeclInnerList) {
        this.ConstDeclInnerList=ConstDeclInnerList;
    }

    public SyntaxNode getParent() {
        return parent;
    }

    public void setParent(SyntaxNode parent) {
        this.parent=parent;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line=line;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(ConstType!=null) ConstType.accept(visitor);
        if(ConstDeclInnerList!=null) ConstDeclInnerList.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(ConstType!=null) ConstType.traverseTopDown(visitor);
        if(ConstDeclInnerList!=null) ConstDeclInnerList.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(ConstType!=null) ConstType.traverseBottomUp(visitor);
        if(ConstDeclInnerList!=null) ConstDeclInnerList.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("ConstDecl(\n");

        if(ConstType!=null)
            buffer.append(ConstType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(ConstDeclInnerList!=null)
            buffer.append(ConstDeclInnerList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [ConstDecl]");
        return buffer.toString();
    }
}
