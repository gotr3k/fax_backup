// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class IfElseStmt extends Statement {

    private Condition Condition;
    private ConditionStatements ConditionStatements;
    private ConditionStatements ConditionStatements1;

    public IfElseStmt (Condition Condition, ConditionStatements ConditionStatements, ConditionStatements ConditionStatements1) {
        this.Condition=Condition;
        if(Condition!=null) Condition.setParent(this);
        this.ConditionStatements=ConditionStatements;
        if(ConditionStatements!=null) ConditionStatements.setParent(this);
        this.ConditionStatements1=ConditionStatements1;
        if(ConditionStatements1!=null) ConditionStatements1.setParent(this);
    }

    public Condition getCondition() {
        return Condition;
    }

    public void setCondition(Condition Condition) {
        this.Condition=Condition;
    }

    public ConditionStatements getConditionStatements() {
        return ConditionStatements;
    }

    public void setConditionStatements(ConditionStatements ConditionStatements) {
        this.ConditionStatements=ConditionStatements;
    }

    public ConditionStatements getConditionStatements1() {
        return ConditionStatements1;
    }

    public void setConditionStatements1(ConditionStatements ConditionStatements1) {
        this.ConditionStatements1=ConditionStatements1;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(Condition!=null) Condition.accept(visitor);
        if(ConditionStatements!=null) ConditionStatements.accept(visitor);
        if(ConditionStatements1!=null) ConditionStatements1.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(Condition!=null) Condition.traverseTopDown(visitor);
        if(ConditionStatements!=null) ConditionStatements.traverseTopDown(visitor);
        if(ConditionStatements1!=null) ConditionStatements1.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(Condition!=null) Condition.traverseBottomUp(visitor);
        if(ConditionStatements!=null) ConditionStatements.traverseBottomUp(visitor);
        if(ConditionStatements1!=null) ConditionStatements1.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("IfElseStmt(\n");

        if(Condition!=null)
            buffer.append(Condition.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(ConditionStatements!=null)
            buffer.append(ConditionStatements.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(ConditionStatements1!=null)
            buffer.append(ConditionStatements1.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [IfElseStmt]");
        return buffer.toString();
    }
}
