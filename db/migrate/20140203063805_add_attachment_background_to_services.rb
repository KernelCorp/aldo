class AddAttachmentBackgroundToServices < ActiveRecord::Migration
  def self.up
    add_attachment :services, :background
  end

  def self.down
    remove_attachment :services, :background
  end
end
