package com.elshopaky.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elshopaky.onlinebookstore.entity.BookCategory;

//This annotation to override rest end point to be ( /book-category ) instead of default ( /bookCategories )
//and make property name bookCategory

@RepositoryRestResource(collectionResourceRel = "bookCategory",path = "book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

}
