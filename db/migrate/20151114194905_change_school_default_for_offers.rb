class ChangeSchoolDefaultForOffers < ActiveRecord::Migration
  def change
  	change_column :offers, :school, :string, default: "Unknown"
  end
end
