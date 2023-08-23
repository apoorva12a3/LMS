package com.example.lms.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "leave_balance")
public class LeaveBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int balanceId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    private LeaveType leaveType;

    private int balance;

	public int getBalanceId() {
		return balanceId;
	}

	public void setBalanceId(int balanceId) {
		this.balanceId = balanceId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public LeaveType getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(LeaveType leaveType) {
		this.leaveType = leaveType;
	}

	public int getBalance() {
		return balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}

	public LeaveBalance() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LeaveBalance(int balanceId, Employee employee, LeaveType leaveType, int balance) {
		super();
		this.balanceId = balanceId;
		this.employee = employee;
		this.leaveType = leaveType;
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "LeaveBalance [balanceId=" + balanceId + ", employee=" + employee + ", leaveType=" + leaveType
				+ ", balance=" + balance + "]";
	}

}
