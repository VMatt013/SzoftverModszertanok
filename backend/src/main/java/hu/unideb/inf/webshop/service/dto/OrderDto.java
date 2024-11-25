package hu.unideb.inf.webshop.service.dto;

import java.util.Date;

public class OrderDto {

    private int id;
    private Date date;
    private String paymentStatus;
    private String status;
    private int userId;
    private String productName;

    public OrderDto(int id, Date date, String paymentStatus, String status, int userId, String productName) {
        this.id = id;
        this.date = date;
        this.paymentStatus = paymentStatus;
        this.status = status;
        this.userId = userId;
        this.productName = productName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}