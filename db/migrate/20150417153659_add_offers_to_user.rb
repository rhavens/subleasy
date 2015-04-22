class AddOffersToUser < ActiveRecord::Migration
  def change
    add_reference :users, :offers, index: true
  end
end
