package com.data.data.impl;

import com.data.data.Model.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DataRepository extends JpaRepository<Data, Long> {

}



