---
layout: full.html
title: Data Validation
---

## Data Validation

One common need when you are dealing with data is validation. Every time you create new documents, update them or publish real-time messages, you may want to **check that their content meets a given set of criteria**.

The most common example is the "e-mail field validation". Imagine you provide a registration form to your users to collect their name and e-mail. It's quite vital to you that the user provides a valid e-mail address.

Instead of leaving you with the burden of coding this logic, Kuzzle natively provides a way to validate your data input against a validation schema. It enables you to define the set document fields to validate and provides you with [an extended set of validation rules](/validation-reference/).

This way, every time Kuzzle receives a data input, it checks it against the validation schema and returns a **standard error** when the validation fails.

You can specify the validation rules in the kuzzle [configuration file](/guide/#configuring-kuzzle) in the `validation` field.

You can take a look at the [Kuzzle Data Validation Reference](/validation-reference/) for a straight dive, or keep reading for a smoother introduction.

### Basic validation

The place to specify your validation schema is the `validation` field in your kuzzlerc file. A validation schema has a [hierarchical structure](/validation-reference/#schema-structure), where you specify a set of rules per collection.

```json
{
  "validation": {
    "onlineshop": {
      "products": {
        "fields": {
          "price": {
              "type": "number",
              "mandatory": true
          },
          "productDescription": {
              "type": "string",
              "defaultValue": "Sorry, no description available for this product."
          }
        }
      }
    }
  }
}
```

Let's take a look at what we just did here.

* We defined a set of rules for the documents contained in the `products` collection, within the `onlineshop` index.
* We specified the field `price` as mandatory (which means that it must have a value) and of type `Number`.
* We specified the field `productDescription` as of type `String`, with a sorry-ish default value.

Take a look at the [Validation Fields Reference](/validation-reference/#fields) for a complete insight of all the available specifications.

### Basic validation with type options

Some field types admit options that can be used to add constraints to these fields.

```json
{
  "validation": {
    "onlineshop": {
      "products": {
        "fields": {
          "price": {
              "type": "number",
              "mandatory": true,
              "typeOptions": {
                "range": {
                  "min": 0
                }
              }
          },
          "productDescription": {
              "type": "string",
              "defaultValue": "Sorry, no description available for this product."
          }
        }
      }
    }
  }
}
```

In the example above, we specified that the value of the field `price` (of documents contained in the `products` collection) must be greater than 0 (because we do not want to make an online shop that gives products away). We leveraged the `typeOption range`, that you can look-up in the [Data Validation Reference](/validation-reference/#typeoptions).


### Complex validation via the DSL

When the validation fields are not enough for your need, or you want conditional validation,
you can switch gears and create a complex validation specification via the [filtering DSL](/real-time-filters/)
(the same DSL used to create real-time subscriptions).
The idea is pretty simple: you specify a filter that documents must match in order to be valid.

```json
{
  "validation": {
    "onlineshop": {
      "products": {
        "fields": {
          "price": {
              "type": "number",
              "typeOptions": {
                "range": {
                  "min": 0
                }
              }
          },
          "vatPrice": {
              "type": "number",
              "typeOptions": {
                "range": {
                  "min": 0
                }
              }
          },
          "productDescription": {
              "type": "string",
              "defaultValue": "Sorry, no description available for this product."
          }
        },
        "validators": [
          // Here goes the filters
          {
            "or": [
              {
                "exists": {
                  "field": "price"
                }
              },
              {
                "exists": {
                  "field": "vatPrice"
                }
              }
            ]
          }
        ]
      }
    }
  }
}
```

In the example above, we specified that at least one of the fields `price` or `vatPrice` must exist (because if the product has no price, we can't sell it).
We leveraged the `exists` term with the `or` operand, that you can look-up in the [Real-time filters Reference](/real-time-filters/#exists).

You can take a look at the [Kuzzle Data Validation Reference](/validation-reference/) for deeper insight.
