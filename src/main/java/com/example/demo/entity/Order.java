package com.example.demo.entity;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "TBL_ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double orderTotal;

    @Column(nullable = false)
    private String orderStatus;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp orderCreatedAt;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Double getOrderTotal() {
		return orderTotal;
	}

	public void setOrderTotal(Double orderTotal) {
		this.orderTotal = orderTotal;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Timestamp getOrderCreatedAt() {
		return orderCreatedAt;
	}

	public void setOrderCreatedAt(Timestamp orderCreatedAt) {
		this.orderCreatedAt = orderCreatedAt;
	}

    // Getters and Setters
    // ...
}