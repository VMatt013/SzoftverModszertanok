package hu.unideb.inf.webshop.data.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="size")
    private int size;
    @Column(name="weight")
    private int weight;
    @Column(name="name")
    private String name;

    @Column(name="price")
    private int price;

    public ProductEntity() {
    }

    public ProductEntity(int id, int size, int weight, String name, int price) {
        this.id = id;
        this.size = size;
        this.weight = weight;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
