ActiveAdmin.register Image do
  actions :all, except: [:edit]

  collection_action :add_files, method: :post do
    @image = Image.new(path: @raw_file)
    if @image.save!
      render json: { success: true, :url => @image.path.url(:thumb), :id => @image.id }
    else
      render json: { success: false }
    end
  end

  collection_action :get_modal do
    render partial: 'modal'
  end

  controller do
    before_filter :parse_raw_upload, only: [:add_files]


    def destroy
      @image = Image.find(params[:id])
      @image.delete
      redirect_to :back
    end


    private
    def parse_raw_upload
      if env['HTTP_X_FILE_UPLOAD'] == 'true'
        @raw_file = env['rack.input']
        @raw_file.class.class_eval { attr_accessor :original_filename, :content_type }
        @raw_file.original_filename = env['HTTP_X_FILE_NAME']
        @raw_file.content_type = env['HTTP_X_MIME_TYPE']
        if @raw_file.class.name == 'Unicorn::TeeInput'
          @raw_file = Paperclip::StringioAdapter.new(@raw_file)
        end
      end
    end
  end

  form :partial => 'images_new_form'


  index do
    selectable_column
    column :title do |image|
      link_to image.path_file_name, admin_image_path(image)
    end

    column :preview do |image|
      image_tag image.path.url(:thumb)
    end
  end

  show do
    attributes_table do
      row :title do |image|
        image.path_file_name
      end
      row :preview do |image|
        image_tag image.path.url(:small)
      end
    end
  end

end
