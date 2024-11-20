package hu.unideb.inf.webshop.data.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="date")
    private Date date;
    @Column(name="user_id")
    private int userId;
    @Column(name="payment_status")
    private String paymentStatus;
    @Column(name="status")
    private String status;

    public OrderEntity() {
    }

    public OrderEntity(int id, Date date, int userId, String paymentStatus, String status) {
        this.id = id;
        this.date = date;
        this.userId = userId;
        this.paymentStatus = paymentStatus;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
