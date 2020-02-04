package Elements;

/*
Not finished yet.

@Author Chen Yifan
 */

import java.util.List;

interface tableOperations {
    public boolean addTable(Table t, int number);
    public boolean removeTable(int number);
    public void listTables();
}

interface menuOperations {

}

public class Restaurant implements tableOperations{
    public List<Table> tables;
    public List<Menu> menus;
    public int id;
    public String name;

    public Restaurant(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public boolean addTable(Table t, int number) {
        return false;
    }

    public boolean removeTable(int number) {
        return false;
    }

    public void listTables() {

    }
}


class Table {
    public int id;
    public int number; // how many number of customer does this table serve
    public String type; // private room, hall, etc.
    public boolean available = true;

    public Table(int id, int number, String type) {
        this.id = id;
        this.number = number;
        this.type =type;
    }

    public boolean bookTable() {
        return false;
    }
}
