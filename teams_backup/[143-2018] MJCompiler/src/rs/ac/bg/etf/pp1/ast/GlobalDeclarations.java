// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class GlobalDeclarations extends GlobalDeclList {

    private GlobalDeclList GlobalDeclList;
    private GlobalDecl GlobalDecl;

    public GlobalDeclarations (GlobalDeclList GlobalDeclList, GlobalDecl GlobalDecl) {
        this.GlobalDeclList=GlobalDeclList;
        if(GlobalDeclList!=null) GlobalDeclList.setParent(this);
        this.GlobalDecl=GlobalDecl;
        if(GlobalDecl!=null) GlobalDecl.setParent(this);
    }

    public GlobalDeclList getGlobalDeclList() {
        return GlobalDeclList;
    }

    public void setGlobalDeclList(GlobalDeclList GlobalDeclList) {
        this.GlobalDeclList=GlobalDeclList;
    }

    public GlobalDecl getGlobalDecl() {
        return GlobalDecl;
    }

    public void setGlobalDecl(GlobalDecl GlobalDecl) {
        this.GlobalDecl=GlobalDecl;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(GlobalDeclList!=null) GlobalDeclList.accept(visitor);
        if(GlobalDecl!=null) GlobalDecl.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(GlobalDeclList!=null) GlobalDeclList.traverseTopDown(visitor);
        if(GlobalDecl!=null) GlobalDecl.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(GlobalDeclList!=null) GlobalDeclList.traverseBottomUp(visitor);
        if(GlobalDecl!=null) GlobalDecl.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("GlobalDeclarations(\n");

        if(GlobalDeclList!=null)
            buffer.append(GlobalDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(GlobalDecl!=null)
            buffer.append(GlobalDecl.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [GlobalDeclarations]");
        return buffer.toString();
    }
}
