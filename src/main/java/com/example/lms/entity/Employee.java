package com.example.lms.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "employee")
public class Employee {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int employeeId;

    private String name;

    @Column(unique = true)
    private String email;
    private String phoneNumber;
    private String department;
    private String password;
    private String username;


    public int getEmployeeId() {
		return employeeId;
	}


	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public Employee(int employeeId, String name, String email, String phoneNumber, String department, String password,
			String username) {
		super();
		this.employeeId = employeeId;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.department = department;
		this.password = password;
		this.username = username;
	}


	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}


	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", name=" + name + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", department=" + department + ", password=" + password + ", username=" + username
				+ "]";
	}


	public LeaveBalance getLeaveBalanceByType(LeaveType leaveTypeName) {
        return null;
    }
}
