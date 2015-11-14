class AddSchoolToOffers < ActiveRecord::Migration
  def change
  	add_column :offers, :school, :integer
  end
end
