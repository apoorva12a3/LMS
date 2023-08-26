package com.example.lms.repository;

import com.example.lms.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface LeaveTypeRepository extends JpaRepository<LeaveType, Integer> {
}

