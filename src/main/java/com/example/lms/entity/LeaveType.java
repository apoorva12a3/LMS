package com.example.lms.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "leave_type")
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int typeId;

    private String typeName;
    private int countAllowed;
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public int getCountAllowed() {
		return countAllowed;
	}
	public void setCountAllowed(int countAllowed) {
		this.countAllowed = countAllowed;
	}
	public LeaveType(int typeId, String typeName, int countAllowed) {
		super();
		this.typeId = typeId;
		this.typeName = typeName;
		this.countAllowed = countAllowed;
	}
	public LeaveType() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "LeaveType [typeId=" + typeId + ", typeName=" + typeName + ", countAllowed=" + countAllowed + "]";
	}

}
