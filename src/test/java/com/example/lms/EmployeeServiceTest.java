package com.example.lms;

import com.example.lms.entity.Employee;
import com.example.lms.repository.EmployeeRepository;
import com.example.lms.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Test
    public void testUpdateEmployee() {
        MockitoAnnotations.openMocks(this); 
        
        Employee existingEmployee = new Employee(1, "Nick", "Nick@example.com", "123456789", "HR", "Nick@1", "nick");
        Employee updatedEmployee = new Employee(1, "Nickk", "nick1@example.com", "987654322", "IT", "1234", "Nick");

        when(employeeRepository.findById(1)).thenReturn(Optional.of(existingEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(updatedEmployee);

        Employee result = employeeService.updateEmployee(1, updatedEmployee);

        assertNotNull(result);
        assertEquals(updatedEmployee.getName(), result.getName());
        assertEquals(updatedEmployee.getEmail(), result.getEmail());
        assertEquals(updatedEmployee.getPhoneNumber(), result.getPhoneNumber());
        assertEquals(updatedEmployee.getDepartment(), result.getDepartment());
        assertEquals(updatedEmployee.getPassword(), result.getPassword());
        assertEquals(updatedEmployee.getUsername(), result.getUsername());
    }

    @Test
    public void UpEmployeeTest() {
        MockitoAnnotations.openMocks(this); 
        
        Employee updatedEmployee = new Employee(1, "Nickk", "nick1@example.com", "987654322", "IT", "1234", "Nick");

        when(employeeRepository.findById(1)).thenReturn(Optional.empty());

        Employee result = employeeService.updateEmployee(1, updatedEmployee);

        assertNull(result);
    }
    
    @Test
    public void testSaveEmployee() {
        MockitoAnnotations.openMocks(this); 
        
        Employee newEmployee = new Employee(1, "Noah", "noah@example.com", "9299994458", "HR", "Noah@1", "noah");

        when(employeeRepository.save(any(Employee.class))).thenReturn(newEmployee);

        Employee result = employeeService.saveEmployee(newEmployee);

        assertNotNull(result);
        assertEquals(newEmployee.getName(), result.getName());
        assertEquals(newEmployee.getEmail(), result.getEmail());
        assertEquals(newEmployee.getPhoneNumber(), result.getPhoneNumber());
        assertEquals(newEmployee.getDepartment(), result.getDepartment());
        assertEquals(newEmployee.getPassword(), result.getPassword());
        assertEquals(newEmployee.getUsername(), result.getUsername());
    }
}
