package com.elshopaky.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.elshopaky.onlinebookstore.entity.Book;

@CrossOrigin("*") //accept request from another app (http://localhost:4200/)
public interface BookRepository extends JpaRepository<Book, Long> {

}
