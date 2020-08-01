package com.elshopaky.onlinebookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.elshopaky.onlinebookstore.entity.Book;

@CrossOrigin("*") //accept request from another app (http://localhost:4200/)
public interface BookRepository extends JpaRepository<Book, Long> {
	
//it will traverse find by category (in Book Entity) then id ( in Category Entity)
//All query method resources are exposed under the search resource (/search)
//api -> http://localhost:8080/api/v1/books/search/findBycategoryId/id=1
//but to override default endpoint we use @RestResource 
	
@RestResource(path = "categoryid")	//api -> http://localhost:8080/api/v1/books/search/categoryid?id=1
Page<Book>	findByCategoryId(@Param("id") Long id,Pageable page);

//api -> http://localhost:8080/api/v1/books/search/searchbyKeyword?name=java
@RestResource(path = "searchbyKeyword")
Page<Book>	findByNameContaining(@Param("name") String keyword,Pageable page);


}
