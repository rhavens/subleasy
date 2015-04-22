class AddOffersToUser < ActiveRecord::Migration
  def change
    add_reference :users, :offers, index: true, foreign_key: true
  end
end
