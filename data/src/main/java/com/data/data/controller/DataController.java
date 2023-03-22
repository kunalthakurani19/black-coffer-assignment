package com.data.data.controller;

import com.data.data.Model.Data;
import com.data.data.impl.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class DataController {
    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/data")
    public List<Data> getAllData() {
        return dataRepository.findAll();
    }

}
