class AddFurnishedToOffers < ActiveRecord::Migration
  def change
    add_column :offers, :furnished, :boolean
  end
end
