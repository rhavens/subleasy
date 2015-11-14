class Offer < ActiveRecord::Base
	belongs_to :user, class_name: "User", :foreign_key => "user_id"

	before_validation :squish_whitespace
	validates_presence_of :line1, :city, :state, :zip, :rent, :start_date,
												:end_date, :school
	validates :image, :format => URI::regexp(%w(http https))
	validate :dates_make_sense 
	geocoded_by :full_address
	after_validation :geocode

	def dates_make_sense
		errors.add(:start_date, "and end date need to make logical sense") if (start_date < Date.today) || (start_date > end_date)
	end

	def squish_whitespace
		self.image = self.image.squish()
		self.line1 = self.line1.squish()
		self.line2 = self.line2.squish()
		self.city = self.city.squish()
	end

	def full_address
		return (self.line1 + " " + self.line2 + " " + self.city + " " + self.state).squish()
	end		
end
