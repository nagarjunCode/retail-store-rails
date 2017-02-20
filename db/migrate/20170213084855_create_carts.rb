class CreateCarts < ActiveRecord::Migration[5.0]
  def change
    create_table :carts do |t|
      t.integer :customer_id
      t.integer :product_id
      t.string :category
      t.float :price
      t.integer :quantity
      t.float :total
      t.string :remove
      t.timestamps
    end
  end
end
