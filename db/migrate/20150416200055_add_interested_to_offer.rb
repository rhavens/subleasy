class AddInterestedToOffer < ActiveRecord::Migration
  def change
    add_column :offers, :interested, :integer
  end
end
