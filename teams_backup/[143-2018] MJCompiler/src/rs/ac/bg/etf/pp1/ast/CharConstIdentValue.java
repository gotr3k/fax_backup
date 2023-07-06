// generated with ast extension for cup
// version 0.8
// 9/1/2023 0:8:48


package rs.ac.bg.etf.pp1.ast;

public class CharConstIdentValue extends ConstIdentValue {

    private String cName;
    private Character charValue;

    public CharConstIdentValue (String cName, Character charValue) {
        this.cName=cName;
        this.charValue=charValue;
    }

    public String getCName() {
        return cName;
    }

    public void setCName(String cName) {
        this.cName=cName;
    }

    public Character getCharValue() {
        return charValue;
    }

    public void setCharValue(Character charValue) {
        this.charValue=charValue;
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
        buffer.append("CharConstIdentValue(\n");

        buffer.append(" "+tab+cName);
        buffer.append("\n");

        buffer.append(" "+tab+charValue);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [CharConstIdentValue]");
        return buffer.toString();
    }
}
