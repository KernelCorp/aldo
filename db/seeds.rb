20.times do |i|
  News.create title: "Example title #{i}", preview: "Example preview #{i}", body: "Example body #{i}"
end

3.times do |i|
  Master.create fio: "Example fio #{i}", biography: "Example biography #{i}"
end

3.times do |i|
  Slide.create title: "Example title #{i}", content: "Example content #{i}", href: '#'
end