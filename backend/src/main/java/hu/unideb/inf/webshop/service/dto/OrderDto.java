package hu.unideb.inf.webshop.service.dto;

import java.util.Date;
import java.util.List;

public class OrderDto {

    private int id;
    private Date date;
    private String paymentStatus;
    private String status;
    private int userId;
    private List<String> productName;

    public OrderDto(int id, Date date, String paymentStatus, String status, int userId, List<String> productName) {
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

    public List<String> getProductName() {
        return productName;
    }

    public void setProductName(List<String> productName) {
        this.productName = productName;
    }
}