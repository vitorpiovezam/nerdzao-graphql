import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nerdzao';
  products: any[] = [];

  constructor(private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.createCategory('Higiene Pessoal');
  }

  getProducts() {
    this.apollo.mutate({
      mutation: gql`
        query allProducts {
          allProducts {
            id
            name
            category {
              name
            }
          }
        }
      `
    }).subscribe(res => console.log(res));
  }

  createCategory(name: String) {
    this.apollo.mutate({
      mutation: gql`
        mutation createCategory($name: String!){
          createCategory(name: $name){
            id,
            name
          }
        }
      `,
      variables: {
        name: name
      }
    }).subscribe(res => console.log(res));
  }

}
