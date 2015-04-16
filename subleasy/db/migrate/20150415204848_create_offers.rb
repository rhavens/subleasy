class CreateOffers < ActiveRecord::Migration
  def change
    create_table :offers do |t|
      t.references :user, index: true, foreign_key: true
      
      t.string :image
      t.string :line1
      t.string :line2
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :rent
      t.date :start_date
      t.date :end_date
      t.boolean :water
      t.boolean :electric
      t.boolean :gas
      t.boolean :heat
      t.boolean :internet
      t.boolean :washdry
      t.boolean :aircond
      t.boolean :handicap
      t.boolean :parking
      t.timestamps null: false
      
    end
  end
end
