// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class WhileStmt extends Statement {

    private WhileEnter WhileEnter;
    private Condition Condition;
    private ConditionStatements ConditionStatements;

    public WhileStmt (WhileEnter WhileEnter, Condition Condition, ConditionStatements ConditionStatements) {
        this.WhileEnter=WhileEnter;
        if(WhileEnter!=null) WhileEnter.setParent(this);
        this.Condition=Condition;
        if(Condition!=null) Condition.setParent(this);
        this.ConditionStatements=ConditionStatements;
        if(ConditionStatements!=null) ConditionStatements.setParent(this);
    }

    public WhileEnter getWhileEnter() {
        return WhileEnter;
    }

    public void setWhileEnter(WhileEnter WhileEnter) {
        this.WhileEnter=WhileEnter;
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

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(WhileEnter!=null) WhileEnter.accept(visitor);
        if(Condition!=null) Condition.accept(visitor);
        if(ConditionStatements!=null) ConditionStatements.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(WhileEnter!=null) WhileEnter.traverseTopDown(visitor);
        if(Condition!=null) Condition.traverseTopDown(visitor);
        if(ConditionStatements!=null) ConditionStatements.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(WhileEnter!=null) WhileEnter.traverseBottomUp(visitor);
        if(Condition!=null) Condition.traverseBottomUp(visitor);
        if(ConditionStatements!=null) ConditionStatements.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("WhileStmt(\n");

        if(WhileEnter!=null)
            buffer.append(WhileEnter.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

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

        buffer.append(tab);
        buffer.append(") [WhileStmt]");
        return buffer.toString();
    }
}
