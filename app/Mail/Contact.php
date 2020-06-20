<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class Contact extends Mailable
{
    use Queueable, SerializesModels;

    public $infos;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($infos)
    {
        $this->infos = $infos;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->infos['subject'])
                    ->from($this->infos['email'], $this->infos['last_name']." ".$this->infos['first_name'])
                    ->view('emails.contact');
    }
}
