package com.elshopaky.onlinebookstore;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

//This class to expose id for entities in JSON 
//( by default response JSON objects return without id but found in links )

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {
	
	 @Autowired
	 EntityManager entityManager;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		 
         // config.exposeIdsFor(Book.class);        //expose id for Book Object in json 
         // config.exposeIdsFor(BookCategory.class); //expose id for BookCategory Object in json 
		
		//expose id fort all entities instead of individual entities
		config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream()
				.map(Type::getJavaType)
				.toArray(Class[]::new));
	}

	
}
