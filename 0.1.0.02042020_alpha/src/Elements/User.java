package Elements;

/*
Users, including customers and admins.

@Author Chen Yifan
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class User {
    public int id;
    public String type; // Customer, Admin, etc.
}

interface CustomerBehavior {
    public void book(); // book table
    public void order();
    public boolean check();
}

/*
Some possible behavior interfaces

interface AdminBehavior {
}

interface WebBehavior {
}

 */

class Customer extends User implements CustomerBehavior, Runnable {
    public String name; // The name that we use to call the customer
    public int phone; // phone number
    public Order order = null;

    public Customer(int id, String type, String name, int phone) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.phone = phone;
    }

    public void book() {
        /*
        To make it simple, here I assume the table is always number 1.
         */
        this.order = new Order(1, new Menu());
        System.out.println("Booking succeed.");
    }

    public void order() {
        /*
        To make it simple, I assume the orders are always the same here. The test of ordering can be found in Item.java
         */

        Dish dish1 = new Dish(1, "Dust", 7.99F, "Tasty dust.");
        Dish dish2 = new Dish(2, "Dirt", 12.99F, "Tasty dirt.");
        Dish dish3 = new Dish(3, "Ash", 24.99F, "Tasty ash.");

        Menu menu = new Menu();
        menu.add(dish1);
        menu.add(dish2);
        menu.add(dish3);

        this.order = new Order(1, menu);

        this.order.add("Dust", 2);
        this.order.add("Ash", 1);
        this.order.add("Dirt", 4);

        System.out.println("Order succeed.");
    }

    public boolean check() {
        /*
        List all the order information, display the total price, and ask
        if the customer wish to check or continue ordering.
         */

        if(this.order == null || this.order.dishes.size() == 0) {
            System.out.println("Order is empty.");
            return false;
        }
        this.order.show();
        return true;
    }

    public void run() {
        boolean flag = true;

        while(flag) {
            System.out.println(this.name + ", please make your choice:");
            System.out.println("(B)ook, (O)rder, (C)heck or (E)xit.");

            Scanner sc = new Scanner(System.in);
            String input = sc.nextLine();

            switch(input) {
                case "b":
                case "B":
                    this.book();
                    break;
                case "o":
                case "O":
                    this.order();
                    break;
                case "c":
                case "C":
                    boolean temp = this.check();
                    if(temp) {
                        flag = false;
                    }
                    break;
                case "e":
                case "E":
                    flag = false;
                    break;
                default:
                    System.out.println("Invalid input. Please try again.");
                    break;
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new Customer(1, "Customer", "Zelda", 123456)).start();
        // new Thread(new Customer(2, "Customer", "Link", 202020)).start();
    }
}
