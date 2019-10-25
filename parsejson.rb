#!/usr/bin/env ruby

require 'json'

all_songs = []

Dir['./Downloads/*.txt'].each do |file|
  song_hash = {}
  lyric_lines = []
  lyric_parts = []

  File.foreach(file).with_index do |line, index|
    line.chomp!
    if index == 0
      song_hash[:title] = line
    elsif !line.empty?
      lyric_lines << line
#puts "adding line to lyric_lines; line contents '#{line}'"
    else
      # empty line
#puts 'found empty line...adding to lyric_parts'
      lyric_parts << lyric_lines.join('<p/>')
      lyric_lines = []
    end
  end

  song_hash[:lyricParts] = lyric_parts
  all_songs << song_hash
end

File.open("allsongs.json","w") do |f|
  f.write(all_songs.to_json)
end


