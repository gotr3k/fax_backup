// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class IntConstIdentValue extends ConstIdentValue {

    private String cName;
    private Integer numValue;

    public IntConstIdentValue (String cName, Integer numValue) {
        this.cName=cName;
        this.numValue=numValue;
    }

    public String getCName() {
        return cName;
    }

    public void setCName(String cName) {
        this.cName=cName;
    }

    public Integer getNumValue() {
        return numValue;
    }

    public void setNumValue(Integer numValue) {
        this.numValue=numValue;
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
        buffer.append("IntConstIdentValue(\n");

        buffer.append(" "+tab+cName);
        buffer.append("\n");

        buffer.append(" "+tab+numValue);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [IntConstIdentValue]");
        return buffer.toString();
    }
}
