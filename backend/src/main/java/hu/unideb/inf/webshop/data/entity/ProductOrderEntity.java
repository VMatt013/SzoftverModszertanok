package hu.unideb.inf.webshop.data.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products_orders")
public class ProductOrderEntity {

    @EmbeddedId
    private ProductOderId id = new ProductOderId();

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "oder_id")
    private OrderEntity order;

    @Column(name = "amount")
    private int amount;

    public ProductOderId getId() {
        return id;
    }

    public void setId(ProductOderId id) {
        this.id = id;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


}
