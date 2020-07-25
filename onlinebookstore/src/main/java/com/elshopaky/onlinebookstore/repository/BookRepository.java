package com.elshopaky.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elshopaky.onlinebookstore.entity.Book;


public interface BookRepository extends JpaRepository<Book, Long> {

}
