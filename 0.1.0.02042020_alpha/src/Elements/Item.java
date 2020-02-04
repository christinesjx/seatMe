package Elements;

/*
Some basic items including dishes, raw materials, menus, etc..
Many of these item objects will be saved in databases.

@Author Chen Yifan
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Item {
    public long id;
    public String name;
    // public String category; // Dish, Raw Material, etc.


    public Item(long id, String name) {
        this.id = id;
        this.name = name;
    }
}

class Dish extends Item {
    /*
    Dish class.
     */
    public float price;
    public String description;

    /*
    List<Materials> materials = new ArrayList<>();
     */

    public Dish(long id, String name, float price, String description) {
        super(id, name);
        this.price = price;
        this.description = description;
    }
}

class Menu {
    /*
    Menu class.
     */
    public List<Dish> menu = new ArrayList<>();
    private List<String> dishNames = new ArrayList<>(); // Keep the names of the dishes

    public void add(Dish d) {
        if(!menu.contains(d)) {
            menu.add(d);
            dishNames.add(d.name);
        }
    }

    public void show() {
        /*
        Print out the menu
         */
        System.out.println("Today's menu is:");

        for (Dish d : menu) {
            System.out.println("--> " + d.name);
            System.out.println("Price: $" + d.price);
            System.out.println(d.description);
        }
    }

    public Dish checkExist(String dishName) {
        /*
        Check if the given name of dish exists. If exist, return the dish object.
         */

        if(this.dishNames.contains(dishName)) {
            for(Dish d: menu) {
                if(d.name.equals(dishName)) {
                    return d;
                }
            }
        }

        return null;
    }
}

class Order {
    /*
    An order is made up of several parts: the table number, the dishes ordered,
    and the total price.

    TODO: order id, customer, etc..
    TODO: Change the table number.
     */

    public int tableNumber;
    public Menu menu; // May have multiple menus, like lunch and dinner

    public float totalPrice = 0f;
    public HashMap<Dish, Integer> dishes = new HashMap<>();
    public List<String> dishNames = new ArrayList<>(); // Used for checking if a dish name exists

    public Order(int tableNumber, Menu menu) {
        /*
        We must make sure that a table is booked before making orders,
        so I put tableNumber here in the constructor.
         */

        this.tableNumber = tableNumber;
        this.menu = menu;
    }

    public void showMenu() {
        this.menu.show();
    }

    public void show() {
        /*
        Show the details of the order.
         */

        System.out.println("--------------------");
        System.out.println("Your order is:");
        System.out.println("Table number: " + this.tableNumber);
        System.out.println("Dishes:");
        for(Dish d : this.dishes.keySet()) {
            System.out.println("--> " + d.name + "\t" + this.dishes.get(d) + " * $" +d.price);
        }
        this.calculateTotalPrice();
        System.out.println("Total price: $" + totalPrice);
        System.out.println("--------------------");
    }

    public boolean add(String dishName, int number) {
        /*
        Add dished into the order. Return true if succeed.
        TODO: check the material reserve to see if we can provide the
          number of dishes ordered
         */

        if(number <= 0) {
            return false;
        }

        Dish d = this.menu.checkExist(dishName);
        if(d != null) {
            // The dish to be added exists
            if(this.dishes.containsKey(d)) {
                this.dishes.replace(d, this.dishes.get(d) + number);
            }else {
                this.dishes.put(d, number);
                this.dishNames.add(dishName);
            }
            return true;

        }else {
            return false;
        }
    }

    public boolean remove(String dishName) {
        // To make it simple, delete the dish directly
        // TODO: support customized number of removal

        if(!this.dishNames.contains(dishName)) {
            return false;
        }

        Dish d = this.menu.checkExist(dishName);
        this.dishNames.remove(dishName);
        this.dishes.remove(d);
        return true;
    }

    /*
    public boolean remove(String dishName, int number) {
    }
     */

    public void clear() {
        /*
        Clear the order.
         */
        this.dishes.clear();
    }

    public void calculateTotalPrice() {
        totalPrice = 0f;

        for(Dish d : this.dishes.keySet()) {
            totalPrice += d.price * this.dishes.get(d);
        }
    }

    public static void main(String[] args) {
        /*
        Tests.
         */
        Dish d1 = new Dish(1, "Dust", 4.99F, "Tasty dust.");
        Dish d2 = new Dish(2, "Dirt", 10.99F, "Tasty dirt.");
        Dish d3 = new Dish(3, "Ash", 29.99F, "Tasty ash.");

        Menu menu = new Menu();
        menu.add(d1);
        menu.add(d2);
        menu.add(d3);

        /*menu.show();
        System.out.println();

         */

        Order order = new Order(1, menu);
        System.out.println("Dust 2 --> " + order.add("Dust", 2));
        System.out.println("Dirt 1 --> " + order.add("Dirt", 1));
        System.out.println("Ash 0 --> " + order.add("Ash", 0));
        System.out.println("Light 10 --> " + order.add("Light", 10));
        System.out.println("Dirt 1 --> " + order.add("Dirt", 1));
        System.out.println();
        order.show();

        System.out.println("Remove Dirt --> " + order.remove("Dirt"));
        System.out.println("Remove Light --> " + order.remove("Light"));
        System.out.println();
        order.show();

        order.clear();
        order.show();
    }
}