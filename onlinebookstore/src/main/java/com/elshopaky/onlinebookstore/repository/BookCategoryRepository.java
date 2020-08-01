package com.elshopaky.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.elshopaky.onlinebookstore.entity.BookCategory;

//This annotation to override rest end point to be ( /book-category ) instead of default ( /bookCategories )
//and make property name in Json object to  bookCategory.

@RepositoryRestResource(collectionResourceRel = "bookCategory",path = "book-category")
@CrossOrigin("*") //accept request from another app (http://localhost:4200/)
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

}
